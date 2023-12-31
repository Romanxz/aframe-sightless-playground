import React, { useEffect, useState, useRef } from 'react';
import ReactPlayer from 'react-player';

export default function LecturePlayer(props) {
  const [currentScene, setCurrentScene] = useState(0);
  const [isLecturePlaying, setLecturePlayback] = useState(true);
  const scenes = props.children;

  const isRightTriggerDown = useRef(false);
  const isLeftTriggerDown = useRef(false);
  const isThumbstickReleased = useRef(true);
  const playerRef = useRef(null);

  const old_timecodes = [
    { start: 0, end: 10 }, // 1
    { start: 11, end: 21.999 }, // 2
    { start: 22.1, end: 32.1 }, // 3
    { start: 32.2, end: 38.9 }, // 4
    { start: 39, end: 46 }, // 5 
    { start: 47, end: 61 }, // 6
    { start: 62, end: 70 }, // 7
    { start: 71, end: 93 }, // 8
    { start: 94, end: 115 }, // 9
    { start: 116, end: 155 }, // 10
    { start: 156, end: 227 }, // 11
    { start: 228, end: 257 }, // 12
    { start: 258, end: 281 }, // 13
    { start: 282, end: 294 }, // 14
    { start: 295, end: 318 }, // 15
    { start: 319, end: 337 }, // 16
    { start: 338, end: 389 }, // 17
    { start: 390, end: 425 }, // 18
    { start: 426, end: 434 }, // 19
    { start: 435, end: 464 }, // 20
    { start: 465, end: 480 }, // 21
    { start: 481, end: 529 } // 22
  ];  // The new timecodes array in seconds
  
  const timecodes = [
    { start: 0, end: 10 }, // 1
    { start: 11, end: 22 }, // 2
    { start: 23, end: 30 }, // 3
    { start: 31, end: 41 }, // 4
    { start: 42, end: 49 }, // 5
    { start: 50, end: 65 }, // 6
    { start: 66, end: 75 }, // 7
    { start: 76, end: 99 }, // 8
    { start: 100, end: 122 }, // 9
    { start: 123, end: 162 }, // 10
    { start: 163, end: 236 }, // 11
    { start: 237, end: 266 }, // 12
    { start: 267, end: 284 }, // 13
    { start: 285, end: 305 }, // 14
    { start: 306, end: 330 }, // 15
    { start: 331, end: 350 }, // 16
    { start: 351, end: 403 }, // 17
    { start: 404, end: 440 }, // 18
    { start: 441, end: 450 }, // 19
    { start: 451, end: 480 }, // 20
    { start: 481, end: 498 }, // 21
    { start: 499, end: 544 } // 22
  ];  // The new timecodes array in seconds

  // method to change player progress
  const changePlayerProgress = (i) => {
    const newTime = timecodes[i].start;
    // @ts-ignore
    playerRef.current.seekTo(newTime, "seconds");
  };

  const pauseDragAction = () => {
    const rightController = document.getElementById("right");
    // @ts-ignore
    rightController.components['drag'].pause();
  };

  const stopAllSounds = () => {
    const allSoundsNodeList = document.querySelectorAll('a-entity[sound]');
    const allSounds = [...allSoundsNodeList];
    // console.log("[useEffect] stopAllSounds:", allSounds)
    for (const soundEl of allSounds) {
      // @ts-ignore
      if (soundEl && soundEl.components.sound) {
        // @ts-ignore
        soundEl.components.sound.stopSound();
      }
    };
  }

  const nextScene = () => {
    const next = (currentScene + 1) % scenes.length;
    stopAllSounds();
    pauseDragAction();
    setCurrentScene(next);
    changePlayerProgress(next);
  };

  const prevScene = () => {
    const prev = (currentScene - 1 + scenes.length) % scenes.length;
    stopAllSounds();
    pauseDragAction();
    setCurrentScene(prev);
    changePlayerProgress(prev);
  };

  useEffect(() => {
    const leftController = document.getElementById('left');
    const rightController = document.getElementById('right');
    if (!rightController || !leftController) return;
    // @ts-ignore
    rightController.components['drag'].play();
    
    rightController.addEventListener('triggerdown', () => { isRightTriggerDown.current = true; });
    rightController.addEventListener('triggerup', () => { isRightTriggerDown.current = false; });
    leftController.addEventListener('triggerdown', () => { isLeftTriggerDown.current = true; });
    leftController.addEventListener('triggerup', () => { isLeftTriggerDown.current = false; });
    leftController.addEventListener('xbuttondown', () => { if (isLeftTriggerDown.current) return; setLecturePlayback(true); });
    leftController.addEventListener('ybuttondown', () => { if (isLeftTriggerDown.current) return; setLecturePlayback(false); });

    function onThumbStickMoved(evt) {
      if (!isRightTriggerDown.current) {
        const direction = evt.detail.x;
        if (direction < -0.4) {
          if (isThumbstickReleased.current) {
            prevScene();
            isThumbstickReleased.current = false;
          }
        } else if (direction > 0.4) {
          if (isThumbstickReleased.current) {
            nextScene();
            isThumbstickReleased.current = false;
          }
        } else {
          isThumbstickReleased.current = true;
        }
      }
    }

    rightController.addEventListener('thumbstickmoved', onThumbStickMoved);

    return () => {
      rightController.removeEventListener('thumbstickmoved', onThumbStickMoved);
      rightController.removeEventListener('triggerdown', () => { isRightTriggerDown.current = true; });
      rightController.removeEventListener('triggerup', () => { isRightTriggerDown.current = false; });
      leftController.removeEventListener('triggerdown', () => { isLeftTriggerDown.current = true; });
      leftController.removeEventListener('triggerup', () => { isLeftTriggerDown.current = false; });
      leftController.removeEventListener('xbuttondown', () => { if (isLeftTriggerDown.current) return; setLecturePlayback(true); });
      leftController.removeEventListener('ybuttondown', () => { if (isLeftTriggerDown.current) return; setLecturePlayback(false); });
      // stopAllSounds();
    };
  }, [nextScene, prevScene]);

  return (<>
    <ReactPlayer
      ref={playerRef}
      url={`${process.env.GH_PAGES_PATH_PREFIX || ""}sightless-lecture.mp3`}
      playing={props.startSounds && isLecturePlaying}
      onProgress={({ playedSeconds }) => {
        if (playedSeconds > timecodes[currentScene].end) {
          pauseDragAction();
          nextScene();
        }
      }}
      hidden
    />
    {scenes[currentScene]}
  </>)
};