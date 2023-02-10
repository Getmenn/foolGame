import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreater from '../../store/reducers/action-creators/allActionCreators'

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(ActionCreater, dispatch)
}