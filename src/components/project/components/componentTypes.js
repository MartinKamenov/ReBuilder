const componentObjects = [
    {
        name: 'Header',
        title: 'Header',
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
            marginRight: 'auto',
            marginTop: '0px',
            marginBottom: '0px',
            paddingLeft: '0px',
            paddingRight: '0px',
            paddingTop: '0px',
            paddingBottom: '0px'
        }
    },
    {
        name: 'Text',
        title: 'Text',
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
            marginRight: 'auto',
            marginTop: '0px',
            marginBottom: '0px',
            paddingLeft: '0px',
            paddingRight: '0px',
            paddingTop: '0px',
            paddingBottom: '0px'
        }
    },
    {
        name: 'Grid',
        title: 'Grid',
        rows: 3,
        columns: 1,
        style: {
            color: '#000000',
            backgroundColor: '#ffffff',
            height: '80px',
            width: '100%',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '0px',
            marginBottom: '0px',
            paddingLeft: '0px',
            paddingRight: '0px',
            paddingTop: '0px',
            paddingBottom: '0px'
        }
    },
    {
        name: 'Input',
        title: 'Input',
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
            marginRight: 'auto',
            marginTop: '0px',
            marginBottom: '0px',
            paddingLeft: '0px',
            paddingRight: '0px',
            paddingTop: '0px',
            paddingBottom: '0px'
        }
    },
    {
        name: 'Image',
        title: 'Image',
        src: 'https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png',
        style: {
            height: '100px',
            width: '200px',
            textAlign: 'center',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '0px',
            marginBottom: '0px'
        }
    },
    {
        name: 'RoutingLink',
        title: 'Routing Link',
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
            marginRight: 'auto',
            marginTop: '0px',
            marginBottom: '0px',
            paddingLeft: '0px',
            paddingRight: '0px',
            paddingTop: '0px',
            paddingBottom: '0px'
        }
    },
    {
        name: 'Container',
        title: 'Container',
        children: [],
        style: {
            color: '#000000',
            backgroundColor: '#ffffff',
            fontSize: '16px',
            height: '200px',
            width: '50%',
            textAlign: 'center',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '0px',
            marginBottom: '0px',
            paddingLeft: '0px',
            paddingRight: '0px',
            paddingTop: '0px',
            paddingBottom: '0px',
            border: '1px solid black',
            borderRadius: '5px'
        }
    },
    {
        name: 'NavigationBar',
        title: 'Navigation bar',
        children: [
            {
                name: 'RoutingLink',
                innerText: 'Website',
                to: '/',
                toValues: [],
                style: {
                    color: '#ffffff',
                    backgroundColor: '#00000000',
                    fontSize: '16px',
                    height: '50px',
                    width: '100px',
                    textAlign: 'center',
                    display: 'block',
                    marginLeft: '10px',
                    marginRight: 'auto',
                    marginTop: '0px',
                    marginBottom: '0px',
                    paddingLeft: '0px',
                    paddingRight: '0px',
                    paddingTop: '0px',
                    paddingBottom: '0px',
                    float: 'left'
                }
            },
            {
                name: 'RoutingLink',
                innerText: 'Login',
                to: '/login',
                toValues: [],
                style: {
                    color: '#ffffff',
                    backgroundColor: '#00000000',
                    fontSize: '16px',
                    height: '50px',
                    width: '100px',
                    textAlign: 'center',
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: '0px',
                    marginBottom: '0px',
                    paddingLeft: '0px',
                    paddingRight: '0px',
                    paddingTop: '0px',
                    paddingBottom: '0px',
                    float: 'right'
                }
            },
            {
                name: 'RoutingLink',
                innerText: 'About',
                to: '/about',
                toValues: [],
                style: {
                    color: '#ffffff',
                    backgroundColor: '#00000000',
                    fontSize: '16px',
                    height: '50px',
                    width: '100px',
                    textAlign: 'center',
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: '0px',
                    marginBottom: '0px',
                    paddingLeft: '0px',
                    paddingRight: '0px',
                    paddingTop: '0px',
                    paddingBottom: '0px',
                    float: 'right'
                }
            },
            {
                name: 'RoutingLink',
                innerText: 'Home',
                to: '/',
                toValues: [],
                style: {
                    color: '#ffffff',
                    backgroundColor: '#00000000',
                    fontSize: '16px',
                    height: '50px',
                    width: '100px',
                    textAlign: 'center',
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: '0px',
                    marginBottom: '0px',
                    paddingLeft: 'auto',
                    paddingRight: '0px',
                    paddingTop: '0px',
                    paddingBottom: '0px',
                    float: 'right'
                }
            },
        ],
        style: {
            color: '#000000',
            backgroundColor: '#513D89',
            fontSize: '16px',
            height: '50px',
            width: '100%',
            textAlign: 'center',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '0px',
            marginBottom: '0px',
            paddingLeft: '0px',
            paddingRight: '0px',
            paddingTop: '0px',
            paddingBottom: '0px',
            border: '1px solid black',
            borderRadius: '5px'
        }
    }
];

export const componentTypes = {
    Header: 'Header',
    Text: 'Text',
    Grid: 'Grid',
    Input: 'Input',
    Image: 'Image',
    RoutingLink: 'RoutingLink',
    Container: 'Container',
    NavigationBar: 'NavigationBar'
};

export default componentObjects;