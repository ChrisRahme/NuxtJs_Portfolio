import type { Ref } from 'vue'

const SEEK_STEP = 2

export function useClipPlayer(video: Ref<HTMLVideoElement | null>, track: Ref<HTMLElement | null>, hoverPlays: Ref<boolean>) {
  const state = reactive({
    playing: false,
    pinned: false,
    held: false,
    seeking: false,
    time: 0,
    duration: 0,
  })

  let frame = 0

  const progress = computed(function () {
    return state['duration'] ? Math.min(1, state['time'] / state['duration']) : 0
  })

  // The fill follows every frame while playing; timeupdate alone moves it in visible steps
  function follow() {
    if (video.value) {
      state['time'] = video.value.currentTime
    }

    if (state['playing']) {
      frame = requestAnimationFrame(follow)
    }
  }

  function play() {
    video.value?.play().catch(function () {
      state['playing'] = false
    })
  }

  function pause() {
    video.value?.pause()
  }

  function toggle() {
    if (state['playing']) {
      state['pinned'] = false
      state['held'] = true
      pause()
    } else {
      state['pinned'] = true
      state['held'] = false
      play()
    }
  }

  function onPointerEnter(event: PointerEvent) {
    if (event.pointerType !== 'mouse' || !hoverPlays.value || state['held']) {
      return
    }

    play()
  }

  function onPointerLeave(event: PointerEvent) {
    if (event.pointerType !== 'mouse') {
      return
    }

    state['held'] = false
    if (!state['pinned']) {
      pause()
    }
  }

  // Video element events
  function onLoadedMetadata() {
    state['duration'] = video.value?.duration || 0
  }

  function onPlay() {
    state['playing'] = true
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(follow)
  }

  function onPause() {
    state['playing'] = false
    cancelAnimationFrame(frame)
    follow()
  }

  function seekTo(time: number) {
    if (!video.value || !state['duration']) {
      return
    }

    const clamped = Math.max(0, Math.min(state['duration'] - 0.05, time))
    video.value.currentTime = clamped
    state['time'] = clamped
  }

  function seekToPointer(event: PointerEvent) {
    const rect = track.value?.getBoundingClientRect()
    if (!rect || !rect.width) {
      return
    }

    seekTo(((event.clientX - rect.left) / rect.width) * state['duration'])
  }

  // Track events
  function onTrackPointerDown(event: PointerEvent) {
    if (event.button !== 0) {
      return
    }

    state['seeking'] = true
    track.value?.setPointerCapture(event.pointerId)
    seekToPointer(event)
  }

  function onTrackPointerMove(event: PointerEvent) {
    if (state['seeking']) {
      seekToPointer(event)
    }
  }

  function onTrackPointerUp(event: PointerEvent) {
    state['seeking'] = false
    if (track.value?.hasPointerCapture(event.pointerId)) {
      track.value.releasePointerCapture(event.pointerId)
    }
  }

  // The viewer moves between projects on the arrow keys: a focused track keeps them for itself
  function onTrackKeydown(event: KeyboardEvent) {
    const actions: Record<string, () => void> = {
      'ArrowLeft': function () {
        seekTo(state['time'] - SEEK_STEP)
      },
      'ArrowRight': function () {
        seekTo(state['time'] + SEEK_STEP)
      },
      'Home': function () {
        seekTo(0)
      },
      'End': function () {
        seekTo(state['duration'])
      },
      ' ': toggle,
      'Enter': toggle,
    }
    const action = actions[event.key]
    if (!action || event.metaKey || event.ctrlKey || event.altKey) {
      return
    }

    event.preventDefault()
    event.stopPropagation()
    action()
  }

  // A new clip starts paused, at zero
  function reset() {
    cancelAnimationFrame(frame)
    Object.assign(state, { playing: false, pinned: false, held: false, seeking: false, time: 0, duration: 0 })
  }

  onBeforeUnmount(function () {
    cancelAnimationFrame(frame)
  })

  return {
    state,
    progress,
    toggle,
    reset,
    onPointerEnter,
    onPointerLeave,
    onLoadedMetadata,
    onPlay,
    onPause,
    onTrackPointerDown,
    onTrackPointerMove,
    onTrackPointerUp,
    onTrackKeydown,
  }
}

// 83.4 -> "1:23"
export function formatClipTime(seconds: number) {
  const whole = Math.max(0, Math.floor(seconds || 0))
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, '0')}`
}
