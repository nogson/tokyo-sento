import React from "react";
import styles from "@/components/Detail/Detail.module.scss";
import Image from "next/image";
import Link from "next/link";
import Map from "@/components/maps/Map";
import { MarkerPropsType } from "@/types/Map";
import { Feature, FeatureCollection } from "geojson";

type propsType = {
  selectedMarker: any;
};

const Detail = ({ selectedMarker }: propsType) => {
  const properties = selectedMarker.properties;
  const geometry = selectedMarker.geometry;

  const abc: FeatureCollection = {
    type: "FeatureCollection",
    features: [selectedMarker],
  };

  return (
    <section className={styles.detailWrap}>
      <div className={styles.detailHead}></div>
      <div className={styles.detail}>
        <div>
          <Image
            className="w-full h-auto"
            src="/assets/images/detail/detail_image01.png"
            alt="Search"
            width={0}
            height={0}
            sizes="100vw"
            priority
          />
        </div>
        <div className={styles.detailContent}>
          <div className={styles.detailContentHead}>
            <h1>{properties.name}</h1>
          </div>
          <p>{properties.description}</p>
          <div className={styles.detailShopInfo}>
            <dl>
              <dt>住所</dt>
              <dd>{properties.address}</dd>
            </dl>
            <dl>
              <dt>営業時間</dt>
              <dd>{properties.businessHours.replace("-", "〜")}</dd>
            </dl>
            <dl>
              <dt>定休日</dt>
              <dd>{properties.holiday}</dd>
            </dl>
            <dl>
              <dt>料金</dt>
              <dd>540円</dd>
            </dl>
          </div>
          <div className={styles.detailShopFeature}>
            {properties.features?.map((feature: string, index: number) => (
              <span key={index}>{feature}</span>
            ))}
          </div>
          <div className={styles.detailMap}>
            <div className={styles.detailShopMap}>
              <Map
                center={geometry.coordinates}
                layerData={abc}
                canSelectMarker={false}
              />
            </div>
            <div className={styles.detailShopMapLink}>
              <Link href="/">アプリの地図で見る</Link>
            </div>
          </div>
          <div className={styles.detailCustomerVoice}>
            <h2>利用者の声</h2>
            <dl className={styles.detailCustomerVoiceItem}>
              <dt></dt>
              <dd>とてもよい銭湯でした。また行きたいと思います</dd>
            </dl>
            <dl className={styles.detailCustomerVoiceItem}>
              <dt></dt>
              <dd>とてもよい銭湯でした。また行きたいと思います</dd>
            </dl>
          </div>
        </div>
      </div>
      <div className={styles.detailBottomButton}>
        <button className="button-primary-solid has-icon-button">
          <i className="icon-onsen" />
          <span>お風呂に入りました</span>
        </button>
      </div>
    </section>
  );
};

export default Detail;
