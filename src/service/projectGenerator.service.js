import JSZip from 'jszip';
import FileSaver from 'file-saver';

const projectGenerator = {
    generateProject: (droppedComponents) => {
        let zip = new JSZip();
        zip.file("idlist.txt", `PMID:29651880\r\nPMID:29303721`);
        zip.generateAsync({type: "blob"}).then(function(content) {
        FileSaver.saveAs(content, "download.zip");
        });
    }
};

export default projectGenerator;