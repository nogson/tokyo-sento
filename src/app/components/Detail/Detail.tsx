import React from "react";
import styles from "@/components/Detail/Detail.module.scss";
import Image from "next/image";
import Link from "next/link";
import Map from "@/components/maps/Map";

type propsType = {
  selectedMarker: any;
};

const Detail = ({ selectedMarker }: propsType) => {
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
            <h1>天国温泉</h1>
          </div>
          <p>
            2023年5月16日オープン。お風呂は奥飛騨の天然湯の花を使用した「華の湯・電気風呂」、
            厳選した生薬・入浴剤等を使用した変わり湯の「彩湯」、深さ90cmの冷水風呂の3種類。サウナは「サイレントロウリュ」と「爆風ミュージックロウリュ」を提供し、サウナの後は地下水シャワーと外気浴スペースでリフレッシュ。ロビーでは生ビール・各種ドリンク・ソフトクリーム等をご用意し、コンパクトながら身近な憩いの場としてご利用いただけます。
          </p>
          <div className={styles.detailShopInfo}>
            <dl>
              <dt>住所</dt>
              <dd>足立区関原3-20-14</dd>
            </dl>
            <dl>
              <dt>営業時間</dt>
              <dd>
                平日14:00〜24:00
                <br />
                土曜・日曜・祝日8時〜24時
              </dd>
            </dl>
            <dl>
              <dt>定休日</dt>
              <dd>不定休</dd>
            </dl>
            <dl>
              <dt>料金</dt>
              <dd>540円</dd>
            </dl>
          </div>
          <div className={styles.detailShopFeature}>
            <span>サウナ</span>
            <span>露天風呂</span>
            <span>岩盤浴</span>
            <span>ジェットバス</span>
            <span>水風呂</span>
            <span>薬湯</span>
            <span>寝湯</span>
            <span>リラックスルーム</span>
          </div>
          <div className={styles.detailMap}>
            <div className={styles.detailShopMap}>
              <Map />
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
