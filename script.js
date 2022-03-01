const audioContext = new AudioContext()

const NOTE_DETALIS = [
    {note: "C", key: "Z", frequency: 261.626, active: false},
    {note: "Db", key: "S", frequency: 277.186, active: false},
    {note: "D", key: "X", frequency: 293.665, active: false},
    {note: "Eb", key: "D", frequency: 311.127, active: false},
    {note: "E", key: "C", frequency: 329.628, active: false},
    {note: "F", key: "V", frequency: 349.228, active: false},
    {note: "Gb", key: "G", frequency: 369.994, active: false},
    {note: "G", key: "B", frequency: 391.995, active: false},
    {note: "Ab", key: "H", frequency: 415.305, active: false},
    {note: "A", key: "N", frequency: 440, active: false},
    {note: "Bb", key: "J", frequency: 466.164, active: false},
    {note: "B", key: "M", frequency: 493.883, active: false},
]

document.addEventListener('keydown', e => {
    if(e.repeat) return
    const keyCode = e.code
    const noteDetail = getNoteDetail(keyCode)

    if(noteDetail == null) return

    noteDetail.active = true
    playNotes()
    console.log(noteDetail)
})

document.addEventListener('keyup', e => {
    const keyCode = e.code
    const noteDetail = getNoteDetail(keyCode)

    if(noteDetail == null) return

    noteDetail.active = false
    playNotes()
})

//func to find the right user press key
function getNoteDetail(keyBoardKey){
    return NOTE_DETALIS.find(n => `Key${n.key}` === keyBoardKey)
}

function playNotes(){
    NOTE_DETALIS.forEach(n =>{
      const keyElement = document.querySelector(`[data-note="${n.note}"]`)
        keyElement.classList.toggle("active", n.active || false)
        if(n.oscillator != null){
            n.oscillator.stop()
            n.oscillator.disconnect();
        }
    })

    const activeNotes =  NOTE_DETALIS.filter(n => n.active)
    const gain = 1 / activeNotes.length
    activeNotes.forEach(n => {
        startNote(n, gain)
    })
}

function startNote(noteDetail, gain){
    const gainNode = audioContext.createGain()
    gainNode.gain.value = gain
    const oscillator = audioContext.createOscillator()
    oscillator.frequency = noteDetail.frequency
    oscillator.type = 'sine'
    oscillator.connect(gainNode).connect(audioContext.destination)
    oscillator.start();
    noteDetail.oscillator = oscillator
}
