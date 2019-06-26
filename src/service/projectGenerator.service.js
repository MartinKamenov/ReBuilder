const projectGenerator = {
    generateProject: (droppedComponents) => {
        const element = document.createElement("a");
        const file = new Blob(['text'], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "myFile.zip";
        document.body.appendChild(element);
        element.click();
    }
};

export default projectGenerator;