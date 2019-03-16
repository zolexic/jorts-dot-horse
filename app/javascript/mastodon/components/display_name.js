import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';

export default class DisplayName extends React.PureComponent {

  static propTypes = {
    account: ImmutablePropTypes.map.isRequired,
    others: ImmutablePropTypes.list,
    localDomain: PropTypes.string,
  };

  render () {
    const { others, localDomain } = this.props;

    function horsieCheck() {
      const isJorts = !/\@/g.test(acctName);
      return isJorts ? <img draggable='false' className='emojione' alt='Horsiefied' title='Horsiefied' src='https://media.jorts.horse/horse-media/custom_emojis/images/000/006/257/original/horsiefied.png' /> : '';
    }
    let displayName, suffix, account;

    if (others && others.size > 1) {
      displayName = others.take(2).map(a => <bdi key={a.get('id')}><strong className='display-name__html' dangerouslySetInnerHTML={{ __html: a.get('display_name_html') }} /></bdi>).reduce((prev, cur) => [prev, ', ', cur]);

      if (others.size - 2 > 0) {
        suffix = `+${others.size - 2}`;
      }
    } else {
      if (others && others.size > 0) {
        account = others.first();
      } else {
        account = this.props.account;
      }

      let acct = account.get('acct');

      if (acct.indexOf('@') === -1 && localDomain) {
        acct = `${acct}@${localDomain}`;
      }

      displayName = <bdi><strong className='display-name__html' dangerouslySetInnerHTML={{ __html: account.get('display_name_html') }} /></bdi>;
      suffix      = <span className='display-name__account'>@{acct}{horsieCheck()}</span>;
    }

    return (
      <span className='display-name'>
        {displayName} {suffix}
      </span>
    );
  }

}
