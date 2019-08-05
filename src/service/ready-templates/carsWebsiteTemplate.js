import uuid from 'uuid';

const templates = [
    {
        name: 'Cars website',
        pages: [
            {
                id: uuid.v1(),
                name: 'Home',
                route: '/',
                elements: [
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
                                    fontSize: '24px',
                                    height: '50px',
                                    width: '100px',
                                    lineHeight: '50px',
                                    textAlign: 'center',
                                    display: 'block',
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
                                    display: 'block',
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
                                    display: 'block',
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
                        src: 'https://images.pexels.com/photos/305070/pexels-photo-305070.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                        style: {
                            height: '500px',
                            width: '100%',
                            textAlign: 'center',
                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginTop: '0px',
                            marginBottom: '0px'
                        }
                    },
                ]
            },
        ]
    },
    {
        name: 'Butique template'
    }
]