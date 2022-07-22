import React, { memo } from 'react';
import './styles.scss';
import { Outlet, useParams } from 'react-router-dom';
import Topic from './components/Topic';

function Question() {
	const params = useParams();
	return <div className='questions'>{params.topic || !params ? <Outlet /> : <Topic />}</div>;
}

export default memo(Question);
