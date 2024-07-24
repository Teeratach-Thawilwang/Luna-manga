import { Dispatch, SetStateAction, useState } from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";

import CenterModal from "@components/backoffice/CenterModal";
import ConfirmDeleteModal from "@components/backoffice/bannerDetail/ConfirmDeleteModal";
import { BannerImageInterface } from "@interfaces/backoffice/BannerInterface";
import { ImageInterface } from "@interfaces/backoffice/ImageInterface";
import BannerCreateEditService from "@services/backoffice/BannerCreateEditService";
import FileService from "@services/backoffice/FileService";
import { createValidateParams, isValid } from "@utils/BannerCreateUpdateHelpers";

export default function FooterControl() {
  const { id } = useParams();
  const state = BannerCreateEditService.getState();
  const [percentBar, setPercentBar] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalShow, setIsModalShow] = useState(false);

  async function onUpdate() {
    if (isUploading) {
      return;
    }
    const validateParams = createValidateParams(state);
    BannerCreateEditService.update({ ...validateParams });
    if (!isValid(validateParams)) {
      return;
    }

    setIsUploading(true);

    const storyId = state.story?.id ?? null;
    const chapterId = state.chapter?.id ?? null;
    const imageIds: number[] = await getImageIds(state.images, setPercentBar);
    BannerCreateEditService.updateBanner(
      Number(id!),
      state.name!,
      state.title!,
      state.type!,
      state.link!,
      state.status!,
      storyId!,
      chapterId!,
      imageIds!,
    );
    setIsUploading(false);
  }

  function onDelete() {
    if (isDeleting) {
      return;
    }
    setIsDeleting(true);
    BannerCreateEditService.deleteBanner(Number(id!));
  }

  return (
    <Box>
      {isUploading ? (
        <ProgressBar>
          <PercentBar type="range" min="0" max="100" step="1" value={percentBar} readOnly />
          <PercentText>{percentBar} %</PercentText>
        </ProgressBar>
      ) : null}
      <DeleteButton onClick={() => setIsModalShow(true)}>Delete</DeleteButton>
      <UpdateButton onClick={onUpdate}>Update</UpdateButton>
      <CenterModal isShow={isModalShow} setShow={setIsModalShow}>
        <ConfirmDeleteModal onDelete={onDelete} />
      </CenterModal>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  margin-top: 20px;
  margin: auto 0 0 0;
  height: 60px;
  width: 100%;

  border: 1px solid #bdbdbd;
  box-sizing: border-box;
  outline: none;
  overflow: hidden;

  color: #000000;
  background-color: #ffffff;

  display: flex;
  align-items: center;
`;

const DeleteButton = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  border-radius: 5px;
  height: 40px;
  width: 125px;
  margin-left: auto;
  margin-right: 20px;

  font-size: 18px;
  color: #fff;
  background-color: #d74c4c;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #df5757;
    cursor: pointer;
  }

  &:active {
    background-color: #d74c4c;
  }
`;

const UpdateButton = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  border-radius: 5px;
  height: 40px;
  width: 125px;

  /* margin-left: auto; */
  margin-right: 20px;

  font-size: 18px;
  color: #fff;
  background-color: #3ba639;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #44b642;
    cursor: pointer;
  }

  &:active {
    background-color: #349f32;
  }
`;

const ProgressBar = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  flex-grow: 1;
  width: auto;
  height: 100%;

  margin-left: 10px;
  margin-right: 10px;

  display: flex;
  align-items: center;
`;

const PercentBar = styled.input`
  /* border: 1px solid red; */
  box-sizing: border-box;

  -webkit-appearance: none;
  appearance: none;
  height: 15px;
  outline: none;
  overflow: hidden;
  flex-grow: 1;
  border-radius: 8px;

  &:hover {
    cursor: pointer;
  }

  &::-webkit-slider-runnable-track {
    width: 8px;
    height: 15px;
    background: #363636;
  }

  &::-moz-range-track {
    width: 8px;
    height: 15px;
    background: #363636;
  }

  &::-webkit-slider-thumb {
    appearance: none;
    width: 0px;
    height: 15px;
    background: #d14e8b;
    box-shadow: -1000px 0 0 1000px #d14e8b;
  }

  &::-moz-range-thumb {
    width: 0px;
    height: 20px;
    border-radius: 50%;
    background: #4caf50;
    box-shadow: -1000px 0 0 1000px #d14e8b;
  }
`;

const PercentText = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  padding-left: 5px;
  padding-right: 5px;

  height: 100%;
  font-size: 18px;
  color: #000;

  display: flex;
  justify-content: center;
  align-items: center;
`;

async function getImageIds(images: BannerImageInterface[] | ImageInterface[], setUploadPercent: Dispatch<SetStateAction<number>>) {
  const count = images.length;
  const imageIds: number[] = [];

  for (let i = 0; i < count; i++) {
    const percent = Number((((i + 1) / count) * 100).toFixed(2));

    if ("id" in images[i]) {
      imageIds.push((images[i] as ImageInterface).id);
      setUploadPercent(percent);
      continue;
    }

    const fileImage = images[i] as BannerImageInterface;
    const imageUploaded = await FileService.uploadFile(fileImage.file as File, fileImage.collection_name);
    imageIds.push(imageUploaded.id);
    setUploadPercent(percent);
  }
  return imageIds;
}
