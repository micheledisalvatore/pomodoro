import { connect } from 'react-redux';
import { Controller, mapStateToProps, mapDispatchToProps } from './Controller';

export default connect(mapStateToProps, mapDispatchToProps)(Controller);
