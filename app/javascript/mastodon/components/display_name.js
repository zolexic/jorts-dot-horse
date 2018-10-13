import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';

export default class DisplayName extends React.PureComponent {

  static propTypes = {
    account: ImmutablePropTypes.map.isRequired,
    withAcct: PropTypes.bool,
  };

  static defaultProps = {
    withAcct: true,
  };

  render () {
    const { account, withAcct } = this.props;
    const displayNameHtml = { __html: account.get('display_name_html') };
    const acctName = this.props.account.get('acct');

    function horsieCheck() {
      const isJorts = !/\@/g.test(acctName);
      return isJorts ? <img draggable='false' className='emojione' alt='Horsiefied' title='Horsiefied' src='https://media.jorts.horse/horse-media/custom_emojis/images/000/006/257/original/horsiefied.png' /> : '';
    }
    return (
      <span className='display-name'>
        <bdi><strong className='display-name__html' dangerouslySetInnerHTML={displayNameHtml} /></bdi> {horsieCheck()} <span className='display-name__account'>@{acctName}</span>
      </span>
    );
  }

}
