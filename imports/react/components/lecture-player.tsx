import React, { useEffect, useState, useRef } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { Entity, Scene } from "aframe-react";
import ReactPlayer from 'react-player';

export default function LecturePlayer(props) {
  const [currentScene, setCurrentScene] = useState(0);
  const [isLecturePlaying, setLecturePlayback] = useState(true);
  const scenes = props.children;

  const isRightTriggerDown = useRef(false);
  const isLeftTriggerDown = useRef(false);
  const isThumbstickReleased = useRef(true);
  const playerRef = useRef(null);

  const timecodes = [
    { start: 0, end: 10 },
    { start: 11, end: 21 },
    { start: 22, end: 30 },
    { start: 31, end: 38 },
    { start: 39, end: 46 },
    { start: 47, end: 61 },
    { start: 62, end: 70 },
    { start: 71, end: 93 },
    { start: 94, end: 115 },
    { start: 116, end: 155 },
    { start: 156, end: 227 },
    { start: 228, end: 257 },
    { start: 258, end: 281 },
    { start: 282, end: 294 },
    { start: 295, end: 318 },
    { start: 319, end: 337 },
    { start: 338, end: 389 },
    { start: 390, end: 425 },
    { start: 426, end: 434 },
    { start: 435, end: 464 },
    { start: 465, end: 480 },
    { start: 481, end: 529 }
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
    console.log("[sound-sequence] allSounds:", allSounds)
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
    pauseDragAction();
    setCurrentScene(next);
    changePlayerProgress(next);
  };

  const prevScene = () => {
    const prev = (currentScene - 1 + scenes.length) % scenes.length;
    pauseDragAction();
    setCurrentScene(prev);
    changePlayerProgress(prev);
  };

  useEffect(() => {
    const leftController = document.getElementById('left');
    const rightController = document.getElementById('right');
    if (!rightController || !leftController) return;
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
      url={`${process.env.GH_PAGES_PATH_PREFIX || ""}Lecture.mp3`}
      playing={props.startSounds && isLecturePlaying}
      onProgress={({ playedSeconds }) => {
        if (playedSeconds > timecodes[currentScene].end) {
          nextScene();
        }
      }}
      hidden
    />
    {scenes[currentScene]}
  </>)
};