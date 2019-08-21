import uuid from 'uuid';
import displayValues from '../../components/project/components/displayValues';
import textAlignValues from '../../components/project/components/textAlignValues';

const carsTemplate =
{
    name: 'Cars website',
    pages: [
        {
            id: uuid.v1(),
            name: 'Home',
            route: '/',
            elements: [
                {
                    index: uuid.v1(),
                    name: 'NavigationBar',
                    title: 'Navigation bar',
                    children: [
                        {
                            index: uuid.v1(),
                            name: 'RoutingLink',
                            innerText: 'Website',
                            to: '/',
                            toValues: [],
                            style: {
                                color: '#ffffff',
                                backgroundColor: '#00000000',
                                fontSize: '24px',
                                height: '50px',
                                width: '100px',
                                lineHeight: '50px',
                                textAlign: 'center',
                                textAlignValues,
                                display: 'block',
                                displayValues,
                                textDecoration: 'none',
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
                            index: uuid.v1(),
                            name: 'RoutingLink',
                            innerText: 'About',
                            to: '/about',
                            toValues: [],
                            style: {
                                color: '#ffffff',
                                backgroundColor: '#00000000',
                                fontSize: '16px',
                                height: '50px',
                                lineHeight: '50px',
                                width: '100px',
                                textAlign: 'center',
                                textAlignValues,
                                display: 'block',
                                displayValues,
                                textDecoration: 'none',
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
                            index: uuid.v1(),
                            name: 'RoutingLink',
                            innerText: 'Home',
                            to: '/',
                            toValues: [],
                            style: {
                                color: '#ffffff',
                                backgroundColor: '#00000000',
                                fontSize: '16px',
                                height: '50px',
                                lineHeight: '50px',
                                width: '100px',
                                textAlign: 'center',
                                textAlignValues,
                                display: 'block',
                                displayValues,
                                textDecoration: 'none',
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
                        textAlignValues,
                        display: 'block',
                        displayValues,
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
                    index: uuid.v1(),
                    name: 'Header',
                    title: 'Header',
                    innerText: 'Cars',
                    style: {
                        color: '#000000',
                        backgroundColor: '#ffffff',
                        fontSize: '24px',
                        height: '50px',
                        width: '100%',
                        textAlign: 'center',
                        textAlignValues,
                        display: 'block',
                        displayValues,
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
                    index: uuid.v1(),
                    name: 'Image',
                    title: 'Image',
                    src: 'https://images.pexels.com/photos/305070/pexels-photo-305070.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                    style: {
                        height: '500px',
                        width: '100%',
                        textAlign: 'center',
                        display: 'block',
                        displayValues,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: '0px',
                        marginBottom: '0px'
                    }
                },
            ]
        },
    ]
}

export default carsTemplate;