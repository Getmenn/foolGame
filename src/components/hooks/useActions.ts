import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreater from '../../store/reducers/action-creators/card'

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(ActionCreater, dispatch)
}