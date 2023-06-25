dragElement(document.getElementById('character1'))
dragElement(document.getElementById('character2'))
dragElement(document.getElementById('character3'))
dragElement(document.getElementById('character4'))
dragElement(document.getElementById('character5'))
dragElement(document.getElementById('character6'))
dragElement(document.getElementById('character7'))
dragElement(document.getElementById('character8'))
dragElement(document.getElementById('character9'))
dragElement(document.getElementById('character10'))

function dragElement(characterElement){
    //set four positions for positioning characters on the screen
    let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;

    characterElement.onpointerdown = pointerDrag;
}

function pointerDrag(e){
    e.preventDefault()
    console.log(e);
    pos3 = e.clientX
    pos4 = e.clientY

    document.onpointermove = elementDrag
    document.onpointerup = stopElementDrag
}

function elementDrag(e){
    pos1 = pos3 - e.clientX
    pos2 = pos4 - e.clientY
    pos3 = e.clientX
    pos4 = e.clientY

    console.log(pos1, pos2, pos3, pos4);

    characterElement.style.right = characterElement.offsetRight - pos2 + "px"
    characterElement.style.left = characterElement.offsetLeft - pos1 + "px"
}

function stopElementDrag(){
    document.onpointerup = null
    document.onpointermove = null
}