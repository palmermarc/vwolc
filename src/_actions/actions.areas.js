import createHistory from 'history/createBrowserHistory';

const history = createHistory();

function setNewActiveArea(areaId) {
    return {
        type: 'ACTIVE_AREA',
        areaId: areaId
    }
}

export function setActiveArea(areaId) {
    return (dispatch) => {
        dispatch( setNewActiveArea( areaId ) )
    }
}