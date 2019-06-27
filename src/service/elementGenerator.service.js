const elementGenerator = {
    generateElements: (droppedComponents) => {
        let result = '';
        droppedComponents.forEach(component => {
            switch(component.name) {
                case 'Header':
                    result += `<h1 className='element-center'>${component.innerText}</h1>`;
                    break;
                case 'Text':
                    result += `<div className='element-center'>${component.innerText}</div>`;
                    break;
                case 'Grid':
                    result += `<div className='element-center'>${component.innerText}</div>`;
                    break;
                default:
                    result += `<div className='element-center'>${component.innerText}</div>`;
                    break;
            }
        });

        return result;
    }
};

export default elementGenerator;