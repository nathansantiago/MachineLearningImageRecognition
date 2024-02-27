import { useEffect, useRef } from 'react';
import * as ml5 from "ml5";
import './App.scss';
import Webcam from 'react-webcam';

const dimensions = {
  width: 800,
  height: 500
}

function App() {
  const videoRef = useRef();
  const { width, height } = dimensions;

  useEffect(() => {
    let detectionInterval;

    // 1. Once the model has loaded, update the dimensions run the model's detection interval
    const modelLoaded = () => {
        videoRef.current.video.width = width;
        videoRef.current.video.height = height;
        detectionInterval = setInterval(() => {
            detect();
        }, 200);
    };

    const objectDetector = ml5.objectDetector('cocossd', modelLoaded);

        const detect = () => {
            if (videoRef.current.video.readyState !== 4) {
                console.warn('Video not ready yet');
                return;
            }

            objectDetector.detect(videoRef.current.video, (err, results) => {
                console.log(results);
            });
        };

      return () => {
          if (detectionInterval) {
              clearInterval(detectionInterval);
          }
      }

  }, []);

  return (
    <>
      <div className='App'>
        <Webcam ref={videoRef}/>
      </div>
    </>
  )
}

export default App
