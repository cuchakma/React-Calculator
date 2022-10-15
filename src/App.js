import React, { useReducer } from 'react';
import './App.css';


function reducer( state, action ) {
  switch( action.operation_type ) {
    case 'MULTIPLY':
      if( ( state.total === '' && state.currentOperand !== '' ) || ( state.previousEvaluation !== '' && state.currentOperand === '' ) ) {
        return {
          ...state,
          currentOperand:'*'
        }
      }

      if( state.total === '' ){
        return state;
      }

      return {
        ...state, 
        previousEvaluation: state.previousEvaluation !== '' ? parseInt(state.total) * parseInt(state.previousEvaluation) : state.total,
        total:'',
        currentOperand:'*'
      };
    case 'DIVIDE':
      if( ( state.total === '' && state.currentOperand !== '' ) || ( state.previousEvaluation !== '' && state.currentOperand === '' )) {
        return {
          ...state,
          currentOperand:'/'
        }
      }

      if( state.total === '' ){
        return state;
      }

      return {
        ...state, 
        previousEvaluation: state.previousEvaluation !== '' ?  parseInt(state.previousEvaluation) / parseInt(state.total) : state.total,
        total:'',
        currentOperand:'/'
      };
    case 'ADD':    
      if( ( state.total === '' && state.currentOperand !== '' ) || ( state.previousEvaluation !== '' && state.currentOperand === '' ) ) {
        return {
          ...state,
          currentOperand:'+'
        }
      }

      if( state.total === '' ){
        return state;
      }

      return {
        ...state, 
        previousEvaluation: state.previousEvaluation !== '' ? parseInt(state.total) + parseInt(state.previousEvaluation) : state.total,
        total:'',
        currentOperand:'+'
      };
    case 'MINUS':
      if( ( state.total === '' && state.currentOperand !== '' ) || ( state.previousEvaluation !== '' && state.currentOperand === '' ) ) {
        return {
          ...state,
          currentOperand:'-'
        }
      }

      if( state.total === '' ){
        return state;
      }

      return {
        ...state, 
        previousEvaluation: state.previousEvaluation !== '' ?  parseInt(state.previousEvaluation) - parseInt(state.total) : state.total,
        total:'',
        currentOperand:'-'
      };
    case 'DEL':
      if( state.total !== '') {
          var total = state.total.toString().split('');
          total.pop();
          total = total.join('') === '' ? '' : parseInt( total.join('') )
          return {
            ...state,
            total:total
          };
      } 

      if( state.currentOperand !== '' ) {
        return {
          ...state,
          currentOperand:''
        };
      }

      if( state.previousEvaluation !== '' ) {
        var previousEvaluation = state.previousEvaluation.toString().split('');
        previousEvaluation.pop();
        previousEvaluation = previousEvaluation.join('') === '' ? '' : parseInt( previousEvaluation.join('') );
        return {
          ...state,
          previousEvaluation:previousEvaluation
        }
      }

      return state;
    case 'AC':
      return {previousEvaluation:'', total:''};
    case 'EVALUATE':
      break;
    default:
      if( ( action.value === '.' && state.currentOperand.includes('.') ) || ( action.value === '0' && state.currentOperand === '0' ) || ( action.value === '.' && state.total === '' ) || ( action.value === '.' && state.total.includes('.') )) {
        return state;
      }

      return {
        ...state,
        total:(state.total === 0 ? action.value : state.total + action.value)
      };
  }
  return state;
}

function App() {
  const [{previousEvaluation, total, currentOperand}, dispatch] = useReducer(reducer, {previousEvaluation:'', total:'', currentOperand:''});
  return (
      <div className='calculator-grid'>
              <div className='output'>
                  <div className='previous-operand'>{previousEvaluation} {currentOperand}</div>
                  <div className='current-operand'>{total}</div>
              </div>
              <button className='span-two' onClick={(e) => { dispatch( {operation_type:'AC'}); }}>AC</button>
              <button onClick={ (e) => { dispatch( {operation_type:'DEL'}); }}>DEL</button>
              <button onClick={ (e) => { dispatch( {operation_type:'DIVIDE'}); }}>÷</button>
              <button onClick={ (e) => { dispatch( {operation_type:'NUMBER', value:e.target.innerText}); }}>1</button>
              <button onClick={ (e) => { dispatch( {operation_type:'NUMBER', value:e.target.innerText}); }}>2</button>
              <button onClick={ (e) => { dispatch( {operation_type:'NUMBER', value:e.target.innerText}); }}>3</button>
              <button onClick={ (e) => { dispatch( {operation_type:'MULTIPLY'}); }}>*</button>
              <button onClick={ (e) => { dispatch( {operation_type:'NUMBER', value:e.target.innerText}); }}>4</button>
              <button onClick={ (e) => { dispatch( {operation_type:'NUMBER', value:e.target.innerText}); }}>5</button>
              <button onClick={ (e) => { dispatch( {operation_type:'NUMBER', value:e.target.innerText}); }}>6</button>
              <button onClick={ (e) => { dispatch( {operation_type:'ADD'}); }}>+</button>
              <button onClick={ (e) => { dispatch( {operation_type:'NUMBER', value:e.target.innerText}); }}>7</button>
              <button onClick={ (e) => { dispatch( {operation_type:'NUMBER', value:e.target.innerText}); }}>8</button>
              <button onClick={ (e) => { dispatch( {operation_type:'NUMBER', value:e.target.innerText}); }}>9</button>
              <button onClick={ (e) => { dispatch( {operation_type:'MINUS'}); }}>-</button>
              <button onClick={ (e) => { dispatch( {operation_type:'NUMBER', value:e.target.innerText}); }}>.</button>
              <button onClick={ (e) => { dispatch( {operation_type:'NUMBER', value:e.target.innerText}); }}>0</button>
              <button className='span-two' onClick={ (e) => { dispatch( {operation_type:'EVALUATE'}); }}>=</button>
      </div>
  );  
}

export default App;
