/**
 * 
 * @returns data from json file and then parse it
 */
export async function readData() {
    return await ((await fetch("./data/data.json")).json())
}
/**
 * make tremplate of languages options
 * @param {string} code - language code
 * @param {string} name - name of the language
 * @param {object} position - target position for send elememt to DOM
 * @returns - option element and send it to select element => option has value=code + text=name
 */
export async function languagesTemplate(code, name, position) {
    const option = document.createElement('option');
    option.value = code;
    option.textContent = name;
    position.appendChild(option);
    return option
}
/**
 * finde user speech then analysis and after that, show it in target position 
 * @param {object} event -  using object for search in respons of web speech API 
 * @param {object} position - place of showing texts
 * @param {object} downloadBtn - btn of downloading text => user shoud accece to download text when has text in fild
 */
export function resultRecord(event, position, downloadBtn) {
    // search in object and find text then put it in varibles
    const speechResult = event.results[0][0].transcript;
    // if result is intrim swhow in p else asit is result
    if (event.results[0].isFinal) {
        position.innerHTML += " " + speechResult;
        // remove p when handel the full text
        position.querySelector("p").remove()
    } else {
        if (!document.querySelector(".intrim")) {
            // creat element to put text for analysis
            const intrim = document.createElement("p")
            intrim.className = "intrim"
            // after analysis send it to position
            position.appendChild(intrim)
        }
        // after that change innerhtml
        document.querySelector(".intrim").innerHTML = " " + speechResult
    }
    // something is writen in result lets enable download btn
    downloadBtn.disabled = false
}
/**
 * All the steps to make a downloading file =>
 * 01. getting text.
 * 02. create file name.
 * 03. create (a) element.
 * 04. set attredurate (href).
 * 05. set attribute for download.
 * 06: set display none for link.
 * 07: push link to body.
 * 08: Ability to download.
 * 09: remove link from body
 * @param {string} resultText - text of user speech that want Dowmload
 * @param {string} FileN - name of file that programmer choose to download
 */
export function downloadTool(resultText, FileN) {
    // 01.getting text
    const text = resultText;
    // 02.create file name
    const fileName = FileN
    // 03. create (a) element
    const link = document.createElement('a');
    // 04. set attredurate (href)
    link.setAttribute(
        'href',
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    // 05. set attribute for download
    link.setAttribute('download', `${fileName}`);
    //  06: set display none for link
    link.style.display = 'none';
    //07: push link to body
    document.body.appendChild(link);
    // 08: Ability to download
    link.click();
    // 09: remove link from body
    document.body.removeChild(link);
}