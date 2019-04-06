import React from 'react';

export default class TitleOrderList extends React.Component {
    render() {
        const { totalItems, title, classes } = this.props;
        return(
            <div style={{ padding: '20px 50px 5px 50px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <div>
                    <span style={{fontWeight: '600'}} className={classes.titleText}>{title}</span>
                </div>
                <div>
                    <span style={{color: 'gray'}}>{totalItems} orders</span>
                </div>
            </div>
        );
    }
}