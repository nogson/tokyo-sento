import styles from "@/components/Detail/Detail.module.scss";
import Map from "@/components/Maps";
import {
  postBathComment,
  useQueryBathComments,
  visitedBath,
} from "@/lib/request/detail";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FeatureCollection } from "geojson";
import Link from "next/link";
import CommentList from "./CommentList";
import Slider from "./Slider";
import { useState } from "react";

type propsType = {
  selectedMarker: any;
};

const Detail = ({ selectedMarker }: propsType) => {
  const [comment, setComment] = useState("");
  const [
    visitedDialogOpened,
    { open: visitedDialogOpen, close: visitedDialogClose },
  ] = useDisclosure(false);
  const [
    commentDialogOpened,
    { open: commentDialogOpen, close: commentDialogClose },
  ] = useDisclosure(false);

  const properties = selectedMarker.properties;
  const geometry = selectedMarker.geometry;

  const layerData: FeatureCollection = {
    type: "FeatureCollection",
    features: [selectedMarker],
  };

  // ログインユーザー情報
  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData(["user"]);
  // コメント情報
  const { data: commentData, status } = useQueryBathComments(selectedMarker.id);
  // コメントの更新
  const { mutate: postComment } = useMutation({
    mutationFn: () => postBathComment(selectedMarker.id, comment),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["comments", selectedMarker.id],
      });
    },
    onSuccess: (data) => {},
    onSettled() {
      queryClient.invalidateQueries({
        queryKey: ["comments", selectedMarker.id],
      });
      commentDialogClose();
    },
  });

  async function visitBath() {
    if (!userInfo) {
      alert("ログインしてください");
      return;
    }
    await visitedBath(selectedMarker.id);
    visitedDialogOpen();
  }

  function showCommentDialog() {
    visitedDialogClose();
    commentDialogOpen();
  }

  return (
    <section className={styles.detailWrap}>
      <div className={styles.detailHead}></div>
      <div className={styles.detail}>
        <Slider />
        <div className={styles.detailContent}>
          <div className={styles.detailContentHead}>
            <h1>{properties.name}</h1>
          </div>
          <p>{properties.description}</p>
          <div className={styles.detailShopInfo}>
            <dl>
              <dt>営業時間</dt>
              <dd>
                {properties.businessHours.replace(",", "〜").replace(",", "")}
              </dd>
            </dl>
            <dl>
              <dt>定休日</dt>
              <dd>{properties.holiday.replace(",", " ")}</dd>
            </dl>
            <dl>
              <dt>最寄り駅</dt>
              <dd>{properties.station}</dd>
            </dl>
            <dl>
              <dt>住所</dt>
              <dd>{properties.address}</dd>
            </dl>
            <dl>
              <dt>料金</dt>
              <dd>540円</dd>
            </dl>
            {properties.homepage && (
              <dl>
                <dt>ホームページ</dt>
                <dd>
                  <Link href={properties.homepage}>{properties.homepage}</Link>
                </dd>
              </dl>
            )}
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
                layerData={layerData}
                canSelectMarker={false}
              />
            </div>
            <div className={styles.detailShopMapLink}></div>
          </div>
          <CommentList comment={commentData} />
        </div>
      </div>
      <div className={styles.detailBottomButton}>
        <button
          className="button-primary-solid has-icon-button"
          onClick={visitBath}
        >
          <i className="icon-onsen" />
          <span>お風呂に入りました</span>
        </button>
      </div>
      <Modal
        opened={visitedDialogOpened}
        withCloseButton
        onClose={visitedDialogClose}
        radius="md"
        centered={true}
        overlayProps={{ opacity: 0.7 }}
        title={
          <div className="title-md-primary">
            {properties.name}のお風呂に入りました！
          </div>
        }
      >
        <p className="mb-md">
          お風呂はどうでしたか？
          <br />
          よかったらコメントお願いします！
        </p>
        <div className="text-al-center">
          <button className="button-primary" onClick={showCommentDialog}>
            お風呂のコメントを書く
          </button>
        </div>
      </Modal>
      <Modal
        opened={commentDialogOpened}
        withCloseButton
        onClose={commentDialogClose}
        radius="md"
        centered={true}
        overlayProps={{ opacity: 0.7 }}
        title={
          <div className="title-md-primary">
            是非良いコメントをお願いします！
          </div>
        }
      >
        <div className="mb-md">
          <textarea
            value={comment}
            className="textarea"
            placeholder="お風呂の感想を書いてください"
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <div className="text-al-center">
          <button className="button-primary" onClick={() => postComment()}>
            コメントを投稿
          </button>
        </div>
      </Modal>
    </section>
  );
};

export default Detail;
