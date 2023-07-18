import template from './example.twig'
import './index'
import $ from 'jquery'

setTimeout(() => {
  $('#app').append($(template()))
}, 100)

