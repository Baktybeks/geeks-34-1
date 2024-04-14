import React from 'react';
import classes from './ModalPokemon.module.sass';
import close from '../../common/img/close.svg'

const ModalPokemon = ({
    children,
    handleShow,
}) => {
    return (
        <>
            <div className={classes.modalWrapper} onClick={handleShow}></div>
            <div className={classes.modalContent}>
                <div className={classes.close} onClick={handleShow}>
                    <div className={classes.img_box}>

                        <img src={close} alt="close"/>
                    </div>
                </div>
                {children}
            </div>
        </>
    );
};

export default ModalPokemon;
