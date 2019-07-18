const componentObjects = [
    {
        name: 'Header',
        innerText: 'Header',
        style: {
            color: '#000000',
            backgroundColor: '#ffffff',
            fontSize: '24px',
            height: '50px',
            width: '100%',
            textAlign: 'center',
            display: 'block',
            marginLeft: 'auto',
            marginRigth: 'auto',
            marginTop: '0px',
            marginBottom: '0px',
            paddingLeft: '0px',
            paddingRigth: '0px',
            paddingTop: '0px',
            paddingBottom: '0px'
        }
    },
    {
        name: 'Text',
        innerText: 'Text',
        style: {
            color: '#000000',
            backgroundColor: '#ffffff',
            fontSize: '16px',
            height: '30px',
            width: '100%',
            textAlign: 'center',
            display: 'block',
            marginLeft: 'auto',
            marginRigth: 'auto',
            marginTop: '0px',
            marginBottom: '0px',
            paddingLeft: '0px',
            paddingRigth: '0px',
            paddingTop: '0px',
            paddingBottom: '0px'
        }
    },
    {
        name: 'Grid',
        rows: 3,
        columns: 1,
        style: {
            color: '#000000',
            backgroundColor: '#ffffff',
            height: '80px',
            width: '100%',
            display: 'block',
            marginLeft: 'auto',
            marginRigth: 'auto',
            marginTop: '0px',
            marginBottom: '0px',
            paddingLeft: '0px',
            paddingRigth: '0px',
            paddingTop: '0px',
            paddingBottom: '0px'
        }
    },
    {
        name: 'Input',
        placeholder: 'Input',
        style: {
            color: '#000000',
            backgroundColor: '#ffffff',
            fontSize: '16px',
            height: '30px',
            width: '100%',
            textAlign: 'center',
            display: 'block',
            marginLeft: 'auto',
            marginRigth: 'auto',
            marginTop: '0px',
            marginBottom: '0px',
            paddingLeft: '0px',
            paddingRigth: '0px',
            paddingTop: '0px',
            paddingBottom: '0px'
        }
    },
    {
        name: 'Image',
        src: 'https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png',
        style: {
            height: '100px',
            width: '200px',
            textAlign: 'center',
            display: 'block',
            marginLeft: 'auto',
            marginRigth: 'auto',
            marginTop: '0px',
            marginBottom: '0px'
        }
    },
    {
        name: 'RoutingLink',
        to: '',
        toValues: [],
        style: {
            color: '#000000',
            backgroundColor: '#ffffff',
            fontSize: '16px',
            height: '30px',
            width: '100%',
            textAlign: 'center',
            display: 'block',
            marginLeft: 'auto',
            marginRigth: 'auto',
            marginTop: '0px',
            marginBottom: '0px',
            paddingLeft: '0px',
            paddingRigth: '0px',
            paddingTop: '0px',
            paddingBottom: '0px'
        }
    }
];

export const componentTypes = {
    Header: 'Header',
    Text: 'Text',
    Grid: 'Grid',
    Input: 'Input',
    Image: 'Image',
    RoutingLink: 'RoutingLink'
};

export default componentObjects;