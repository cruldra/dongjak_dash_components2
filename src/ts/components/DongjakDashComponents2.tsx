import React, {ReactNode} from 'react';
import {DashComponentProps} from '../props';

type Props = {
    // Insert props
    test: ReactNode
} & DashComponentProps;

/**
 * Component description
 */
const DongjakDashComponents2 = (props: Props) => {
    const {id, test} = props;
    return (
        <div id={id}>
            {test}
            {/* Insert code */}
        </div>
    )
}

DongjakDashComponents2.defaultProps = {};

export default DongjakDashComponents2;
