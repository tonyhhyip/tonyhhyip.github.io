'use strict';
const tab = location.pathname.replace(/\.html/, '').replace(/^\//, '');
document.getElementById(`tab-${tab || 'index'}`).setAttribute('class', 'active');
import './ga';
import './material';

