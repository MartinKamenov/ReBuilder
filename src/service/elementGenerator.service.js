import { componentTypes } from '../components/project/components/componentTypes';

const elementGenerator = {
    generateElements: (elements) => {
        let result = '';
        elements.forEach(component => {
            switch(component.name) {
                case componentTypes.Header:
                    result += 
`<h1 className='element-center' style={${JSON.stringify(component.style)}}>${component.innerText}</h1>`;
                    break;
                case componentTypes.Text:
                    result += 
`<div className='element-center' style={${JSON.stringify(component.style)}}>${component.innerText}</div>`;
                    break;
                case componentTypes.Grid:
                    result += 
`<div className='element-center' style={${JSON.stringify(component.style)}}>${component.innerText}</div>`;
                    break;
                case componentTypes.Input:
                    result += 
`<input className='element-center' style={${JSON.stringify(component.style)}}/>`;
                    break;
                case componentTypes.Image:
                    result += 
`<img src={${JSON.stringify(component.src)}} className='element-center' style={${JSON.stringify(component.style)}}/>`;
                    break;
                case componentTypes.RoutingLink:
                    result += 
`<Link to='${component.to}' className='element-center' style={${JSON.stringify(component.style)}}>${component.innerText}</Link>`;
                    break;
                default:
                    result += 
`<div className='element-center' style={${JSON.stringify(component.style)}}>${component.innerText}</div>`;
                    break;
            }
        });

        return result;
    }
};

export default elementGenerator;