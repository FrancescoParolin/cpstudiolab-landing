// Prepara il video dell'apertura dall'originale di Higgsfield (vedi VIDEO_APERTURA.md).
// Corregge il colore con la tabella di colore-video.py, riduce il lato, taglia la durata e ricodifica in H.264.
// Sul Mac non serve altro: usa AVFoundation e Core Image.
//
//   python3 immagini-originali/colore-video.py cubo /tmp/cubo.bin
//   swiftc -O -o /tmp/prepara-video immagini-originali/prepara-video.swift
//   /tmp/prepara-video <originale.mp4> <uscita.mp4> <cubo.bin> <lato px> <bit al secondo> <secondi al massimo>
import AVFoundation
import CoreImage

let args = CommandLine.arguments
let src = AVURLAsset(url: URL(fileURLWithPath: args[1]))
let dst = URL(fileURLWithPath: args[2])
try? FileManager.default.removeItem(at: dst)
let cubo = try! Data(contentsOf: URL(fileURLWithPath: args[3]))
let lato = Int(args[4])!, bitrate = Int(args[5])!, durataMax = Double(args[6])!
let sRGB = CGColorSpace(name: CGColorSpace.sRGB)!

let track = src.tracks(withMediaType: .video)[0]
let larg = Int(track.naturalSize.width), alt = Int(track.naturalSize.height)
let reader = try! AVAssetReader(asset: src)
let lettura = AVAssetReaderTrackOutput(track: track, outputSettings: [
    kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA])
reader.add(lettura)

let writer = try! AVAssetWriter(outputURL: dst, fileType: .mp4)
let scrittura = AVAssetWriterInput(mediaType: .video, outputSettings: [
    AVVideoCodecKey: AVVideoCodecType.h264, AVVideoWidthKey: lato, AVVideoHeightKey: lato,
    AVVideoColorPropertiesKey: [
        AVVideoColorPrimariesKey: AVVideoColorPrimaries_ITU_R_709_2,
        AVVideoTransferFunctionKey: AVVideoTransferFunction_ITU_R_709_2,
        AVVideoYCbCrMatrixKey: AVVideoYCbCrMatrix_ITU_R_709_2],
    AVVideoCompressionPropertiesKey: [
        AVVideoAverageBitRateKey: bitrate,
        AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel,
        AVVideoMaxKeyFrameIntervalKey: 48]])
scrittura.expectsMediaDataInRealTime = false
let adattatore = AVAssetWriterInputPixelBufferAdaptor(assetWriterInput: scrittura, sourcePixelBufferAttributes: [
    kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA,
    kCVPixelBufferWidthKey as String: larg, kCVPixelBufferHeightKey as String: alt])
writer.add(scrittura)
writer.shouldOptimizeForNetworkUse = true   // i dati di avvio in testa: parte anche mentre scarica

let filtro = CIFilter(name: "CIColorCubeWithColorSpace")!
filtro.setValue(33, forKey: "inputCubeDimension")
filtro.setValue(cubo, forKey: "inputCubeData")
filtro.setValue(sRGB, forKey: "inputColorSpace")
let ci = CIContext(options: [.workingColorSpace: sRGB])

reader.startReading(); writer.startWriting(); writer.startSession(atSourceTime: .zero)
var scritti = 0
let fine = DispatchSemaphore(value: 0)
scrittura.requestMediaDataWhenReady(on: DispatchQueue(label: "codifica")) {
    while scrittura.isReadyForMoreMediaData {
        guard let campione = lettura.copyNextSampleBuffer(),
              CMTimeGetSeconds(CMSampleBufferGetPresentationTimeStamp(campione)) < durataMax,
              let ingresso = CMSampleBufferGetImageBuffer(campione) else {
            scrittura.markAsFinished(); reader.cancelReading(); writer.finishWriting { fine.signal() }; return
        }
        filtro.setValue(CIImage(cvPixelBuffer: ingresso, options: [.colorSpace: sRGB]), forKey: kCIInputImageKey)
        var uscita: CVPixelBuffer?
        CVPixelBufferPoolCreatePixelBuffer(nil, adattatore.pixelBufferPool!, &uscita)
        ci.render(filtro.outputImage!, to: uscita!, bounds: CGRect(x: 0, y: 0, width: larg, height: alt), colorSpace: sRGB)
        adattatore.append(uscita!, withPresentationTime: CMSampleBufferGetPresentationTimeStamp(campione))
        scritti += 1
    }
}
fine.wait()
print(writer.status == .completed ? "fatto: \(scritti) fotogrammi" : "errore: \(String(describing: writer.error))")
