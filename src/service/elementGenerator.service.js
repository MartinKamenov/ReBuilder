import { componentTypes } from '../components/project/components/componentTypes';
const getElement = (component) => {
    switch(component.name) {
        case componentTypes.Header:
            return ( 
`<h1 className='element-center' style={${JSON.stringify(component.style)}}>${component.innerText}</h1>`
            );
        case componentTypes.Text:
            return ( 
`<div className='element-center' style={${JSON.stringify(component.style)}}>${component.innerText}</div>`
            );
        case componentTypes.Grid:
            return ( 
`<div className='element-center' style={${JSON.stringify(component.style)}}>${component.innerText}</div>`
            );
        case componentTypes.Input:
            return ( 
`<input className='element-center' style={${JSON.stringify(component.style)}}/>`
            );
        case componentTypes.Image:
            return ( 
`<img alt='element' src={${JSON.stringify(component.src)}} className='element-center' style={${JSON.stringify(component.style)}}/>`
            );
        case componentTypes.RoutingLink:
            return ( 
`<Link to='${component.to}' className='element-center' style={${JSON.stringify(component.style)}}>${component.innerText}</Link>`
            );
        case componentTypes.Container:
            return ( 
`<div className='element-center' style={${JSON.stringify(component.style)}}>
${component.children.map(c => getElement(c)).join('\n')}
</div>`
            );
        default:
            return (
`<div className='element-center' style={${JSON.stringify(component.style)}}>${component.innerText}</div>`
            );
    }
};

const elementGenerator = {
    generateElements(elements) {
        let result = '';
        elements.forEach(component => {
            result += getElement(component);
        });

        return result;
    }
};

export default elementGenerator;