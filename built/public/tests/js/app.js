"use strict";

class App {
  constructor() {
    this.btnRecords = document.getElementsByClassName('btn-record');



    // this.btnStop = document.getElementById('btn-stop');

    // this.debugTxt = document.getElementById('debug-txt')

    this.recordingsCont = document.getElementById('recordings-cont')

    this.isRecording = false
    this.saveNextRecording = false

    // this.debugTxt.innerHTML = "stopped"
  }

  init() {
    this._initEventListeners()
  }

  _initEventListeners() {

    let clickstarthandler = evt => {

      isRecording = !isRecording;

      if (!isRecording) {
        console.log('stopped recording')
        this._stopAllRecording();

        this.btnRecords.disabled = false
        // this.btnStop.disabled = true
      } else {
        console.log('started recording')

        this._stopAllRecording()
        this.saveNextRecording = true
        this._startRecording()

        this.btnRecords.disabled = true
        // this.btnStop.disabled = false
      }
      // this.debugTxt.innerHTML = "recording"
    }

    let isRecording = false;

    Array.from(this.btnRecords).forEach(e => e.addEventListener('click', clickstarthandler))

    // this.btnStop.addEventListener('click', evt => {
    //   this._stopAllRecording();

    //   this.btnRecord.disabled = false
    //   this.btnStop.disabled = true
    //   // this.debugTxt.innerHTML = "stopped"
    // })
  }

  _startRecording() {
    if (!this.recorderSrvc) {
      this.recorderSrvc = new RecorderService()
      this.recorderSrvc.em.addEventListener('recording', (evt) => this._onNewRecording(evt))
    }

    // if (!this.webAudioPeakMeter) {
    //   this.webAudioPeakMeter = new WebAudioPeakMeter()
    //   this.meterEl = document.getElementById('recording-meter')
    // }

    // this.recorderSrvc.onGraphSetupWithInputStream = (inputStreamNode) => {
    //   this.meterNodeRaw = this.webAudioPeakMeter.createMeterNode(inputStreamNode, this.recorderSrvc.audioCtx)
    //   this.webAudioPeakMeter.createMeter(this.meterEl, this.meterNodeRaw, {})
    // }

    this.recorderSrvc.startRecording()
    this.isRecording = true
    // this.debugTxt.innerHTML = "recording..."
  }

  _stopAllRecording() {
    if (this.recorderSrvc && this.isRecording) {

      this.recorderSrvc.stopRecording()
      this.isRecording = false

      if (this.meterNodeRaw) {
        this.meterNodeRaw.disconnect()
        this.meterNodeRaw = null
        this.meterEl.innerHTML = ''
      }
    }
  }

  _onNewRecording(evt) {
    if (!this.saveNextRecording) {
      return
    }
    const newIdx = this.recordingsCont.childNodes.length + 1

    const newEl = document.createElement('div')
    newEl.innerHTML = '<audio id="audio-recording-' + newIdx + '" controls></audio>'
    this.recordingsCont.appendChild(newEl)
    console.log('test')

    const recordingEl = document.getElementById("audio-recording-" + newIdx);
    recordingEl.src = evt.detail.recording.blobUrl
    recordingEl.type = evt.detail.recording.mimeType
    //test

    //endtest
  }
}
//test
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}
