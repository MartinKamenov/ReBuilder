import JSZip from 'jszip';
import FileSaver from 'file-saver';
import templatingService from './templating.service';

const projectGenerator = {
    generateProject: (name, droppedComponents) => {
        let zip = new JSZip();
        const templates = templatingService.getAllTemplates();
        templates.forEach((templateObject) => {
            zip.file(templateObject.filePath, templateObject.template);
        });
        zip.generateAsync({type: "blob"}).then(function(content) {
            FileSaver.saveAs(content, `${name}.zip`);
        });
    }
};

export default projectGenerator;