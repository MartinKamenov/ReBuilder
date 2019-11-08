import JSZip from 'jszip';
import FileSaver from 'file-saver';
import templatingService from './templating.service';

const projectGenerator = {
    generateProject: (name, pages, imageUrl) => {
        let zip = new JSZip();
        const templates = templatingService.getAllTemplates(name, pages, imageUrl);
        templates.forEach((templateObject) => {
            zip.file(templateObject.filePath, templateObject.template);
        });
        zip.generateAsync({type: 'blob'}).then(function(content) {
            FileSaver.saveAs(content, `${name}.zip`);
        });
    },

    generateProjectFiles: (templates, name) => {
        let zip = new JSZip();

        templates.forEach((templateObject) => {
            zip.file(templateObject.filePath, templateObject.template);
        });
        zip.generateAsync({type: 'blob'}).then(function(content) {
            FileSaver.saveAs(content, `${name}.zip`);
        });
    }
};

export default projectGenerator;