const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const frames = {
    currentFrame: 0,
    maxFrame: 382,
};

let imagesLoaded = 0;
const images = [];

function preloadMedia(){
    for(var i = 1; i<=frames.maxFrame; i++){
        const imageURL = `./Frames/frame_${i.toString().padStart(4, '0')}.jpeg`
        const img =  new Image();
        img.src = imageURL;

        img.onload = () => {
          imagesLoaded++;
          if(imagesLoaded === frames.maxFrame){
            loadImage(frames.currentFrame);
            startAnimation();
          }
        }
        images.push(img);
    }
}

function loadImage(index){
    if(index >= 0 && index <= frames.maxFrame){
        const img = images[index];

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        const scale = Math.max(scaleX, scaleY);

        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        context.drawImage(img, offsetX, offsetY, newWidth, newHeight);

        frames.currentFrame = index;
    }
}

function startAnimation(){
    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".parent",
            start: "top top",
            end: "bottom bottom",
            scrub: 2,
            markers: true
        }
    })

    tl.to(frames, {
        currentFrame: frames.maxFrame,
        onUpdate: function(){
            loadImage(Math.floor(frames.currentFrame));
        }
    })
}

preloadMedia();