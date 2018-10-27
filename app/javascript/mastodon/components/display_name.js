import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

export default class DisplayName extends React.PureComponent {

  static propTypes = {
    account: ImmutablePropTypes.map.isRequired,
    others: ImmutablePropTypes.list,
  };

  render () {
    const { account, others } = this.props;
    const displayNameHtml = { __html: account.get('display_name_html') };
    const acctName = this.props.account.get('acct');

    function horsieCheck() {
      const isJorts = !/\@/g.test(acctName);
      return isJorts ? <img draggable='false' className='emojione' alt='Horsiefied' title='Horsiefied' src='https://media.jorts.horse/horse-media/custom_emojis/images/000/006/257/original/horsiefied.png' /> : '';
    }
    let suffix;

    if (others && others.size > 1) {
      suffix = `+${others.size}`;
    } else {
      suffix = <span className='display-name__account'>@{account.get('acct')}</span>;
    }

    return (
      <span className='display-name'>
        <bdi><strong className='display-name__html' dangerouslySetInnerHTML={displayNameHtml} /></bdi> {horsieCheck()} <span className='display-name__account'>@{acctName}</span>
      </span>
    );
  }

}
