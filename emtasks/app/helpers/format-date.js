import Ember from 'ember';

export function formatDate() {
  return moment(params[0]).format('YYYY-MM-DD');
}

export default Ember.Helper.helper(formatDate);
