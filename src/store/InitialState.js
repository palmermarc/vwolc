// Once the reducers are in place, add them here

let defaultActiveArea = 0;

if( localStorage.getItem('activeArea') !== null ) {
    defaultActiveArea = localStorage.getItem('activeArea');
}

export default {
    areas: {
        activeArea: defaultActiveArea
    },
    user: {
        username: '',
        id: 0,
        token: '',
        email: ''
    }
};