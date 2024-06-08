import React, { useState } from "react";
import styles from "./MyMenu.module.scss";
import Image from "next/image";
import IconMyPage from "@/assets/images/icon_mypage.svg";
import { useQueryUser } from "@/lib/request/user";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Popover } from "@mantine/core";
import { logout } from "@/lib/request/auth";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";

type PropsType = {
  isTooltipOpen: boolean;
  setIsTooltipOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MyMenu = ({ isTooltipOpen, setIsTooltipOpen }: PropsType) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: userData, status } = useQueryUser();
  const [popoverOpened, setPopoverOpened] = useState(false);

  const queryClient = useQueryClient();

  const logoutFunc = async () => {
    // TODO: ログアウト処理
    await logout();
    queryClient.resetQueries({
      queryKey: ["user", "visitedBath"],
      exact: true,
    });

    close();
    notifications.show({
      message: "ログアウトしました",
      withCloseButton: false,
      color: "#21c0a6",
    });
  };

  return (
    <>
      <div className={styles.navMyPage}>
        <div className="cursor-pointer">
          <Popover
            position="bottom-end"
            withArrow
            shadow="md"
            opened={popoverOpened}
            onChange={setPopoverOpened}
          >
            <Popover.Target>
              <Image
                src={IconMyPage}
                alt="My page"
                priority
                onClick={() => setPopoverOpened((o) => !o)}
              />
            </Popover.Target>
            <Popover.Dropdown>
              <nav className={styles.popoverNav}>
                {userData ? (
                  <>
                    <div className={styles.nickName}>{userData.nickName}</div>
                    <div className={styles.email}>{userData.email}</div>

                    <ul>
                      <li onClick={open}>
                        <FiLogOut />
                        <span>ログアウト</span>
                      </li>
                    </ul>
                  </>
                ) : (
                  <ul>
                    <li>
                      <FiLogIn />
                      <span>
                        <Link href="/login">ログイン</Link>
                      </span>
                    </li>
                  </ul>
                )}
              </nav>
            </Popover.Dropdown>
          </Popover>
        </div>
        {/* <nav
          className={`${styles.tooltip} ${
            isTooltipOpen ? styles.tooltipShow : ""
          }`}
        >
          {userData ? (
            <>
              <div className={styles.nickName}>{userData.nickName}</div>
              <div className={styles.email}>{userData.email}</div>

              <ul>
                <li onClick={open}>
                  <FiLogOut />
                  <span>ログアウト</span>
                </li>
              </ul>
            </>
          ) : (
            <ul>
              <li>
                <FiLogIn />
                <span>
                  <Link href="/login">ログイン</Link>
                </span>
              </li>
            </ul>
          )}
        </nav> */}
      </div>
      <Modal
        opened={opened}
        onClose={close}
        title="ログアウトしますか？"
        centered
      >
        <div className="modal-button-wrapper">
          <button onClick={close}>キャンセル</button>
          <button className="button-primary" onClick={logoutFunc}>
            ログアウト
          </button>
        </div>
      </Modal>
    </>
  );
};

export default MyMenu;
