import React from 'react';
import style from './ServiceArea.module.scss'
const ServiceArea = () => {
    return (
        <div className={style.serviceArea}>
            <div className={style.container}>
                <h2>Xidmət şəbəkəsi</h2>
                <div className={style.mapContainer}>
<iframe src="https://yandex.com.tr/map-widget/v1/?ll=44.032146%2C39.683541&z=7.61&pt=45.35970095397134%2C41.09266052255035~45.44083101534289%2C41.11271049989184~45.617141338628464%2C40.98136895395095~46.40486566137441%2C41.725118692472684~45.80642125397135%2C40.57410103411367~46.02760360794271%2C40.82772597595495~46.648006866059106%2C41.63343548602105~46.33362816931424%2C40.67626912561354~46.4046047%2C40.7639415330864~46.36684153896962%2C40.701710680286936" width="100%" height="500" frameborder="0" style={{width:800}}></iframe>

                </div>

            </div>

        </div>
    );
}

export default ServiceArea;
