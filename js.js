// const btn1=document.querySelector('#btn1')
// const audio1=new Audio()
// const musArr=['riffle.wav','pistol.wav','shotgun.wav','cg1.wav']
// // audio1.src=musArr[Math.floor(Math.random() *  musArr.length)]
// audio1.src='rifle.wav'
// const audioCtx=new window.AudioContext()
// btn1.addEventListener('click',()=>{
//
//
//     audio1.play()
//     audio1.addEventListener('playing',()=>{
//         console.log(1)
//     })
//     audio1.addEventListener('ended',()=>{
//         console.log(2)
//     })
// })
//
// const btn2=document.querySelector('#btn2')
// btn2.addEventListener('click',playSound)
// function playSound(){
// const oscillator = audioCtx.createOscillator()
//     oscillator.connect(audioCtx.destination)
//     oscillator.type = 'sine'
//     oscillator.start()
//     setTimeout(function (){
//         oscillator.stop()
//     },1000)
// }



const container=document.querySelector('.container')
const canvas=document.querySelector('#canvas1')
const file=document.querySelector('#inp')

canvas.width=window.innerWidth
canvas.height=window.innerHeight
const ctx=canvas.getContext('2d')
let audioSource;
let analyser;
// container.addEventListener('click',()=> {
//     //let audio1 = new Audio()
//
//     const audio1=document.querySelector('#audio1')
//     audio1.src='rifle.wav'
//     const audioCtx=new AudioContext()
//     audio1.play()
//     audioSource=audioCtx.createMediaElementSource(audio1)
//     analyser=audioCtx.createAnalyser()
//     audioSource.connect(analyser)
//     analyser.connect(audioCtx.destination)
//     analyser.fftSize=32768
//     const bufferLength=analyser.frequencyBinCount
//     const dataArray=new Uint8Array(bufferLength)
//     const barWidth=(canvas.width/2)/bufferLength
//     let barHeight;
//     let x;
//
//     function animate(){
//         x=0
//         ctx.clearRect(0,0,canvas.width,canvas.height)
//         analyser.getByteFrequencyData(dataArray)
//         drawVisualiser(bufferLength,x,barWidth,barHeight,dataArray)
//
//         requestAnimationFrame(animate)
//
//     }
//     animate()
//
// })


file.addEventListener('change',function (){

    const files=this.files
    const audio1=document.querySelector('#audio1')
    audio1.src=URL.createObjectURL(files[0])
    audio1.load()
    audio1.play()

    const audioCtx=new AudioContext()
    audioSource=audioCtx.createMediaElementSource(audio1)
    analyser=audioCtx.createAnalyser()
    audioSource.connect(analyser)
    analyser.connect(audioCtx.destination)
    analyser.fftSize=2048
    const bufferLength=analyser.frequencyBinCount
    const dataArray=new Uint8Array(bufferLength)
    // const barWidth=(canvas.width/2)/bufferLength
    const barWidth=15
    let barHeight;
    let x;

    function animate(){
        x=0
        ctx.clearRect(0,0,canvas.width,canvas.height)
        analyser.getByteFrequencyData(dataArray)
        drawVisualiser(bufferLength,x,barWidth,barHeight,dataArray)


        requestAnimationFrame(animate)

    }
    animate()
})

function drawVisualiser(bufferLength,x,barWidth,barHeight,dataArray){
    for(let i=0;i<bufferLength;i++){
        barHeight=dataArray[i]*1.5
        ctx.save()
        ctx.translate(canvas.width/2,canvas.height/2)
        ctx.rotate(i*Math.PI*10 / bufferLength)
       const hue=i*1.2

        ctx.fillStyle=`hsl(${hue},100%,${barHeight/2.1}%)`

        ctx.fillRect(0,0,barWidth,barHeight)
        x+=barWidth
ctx.restore()
    }

}











