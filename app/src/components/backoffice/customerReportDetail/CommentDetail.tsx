import styled from "styled-components";

import { CommentDetailReportInterface } from "@interfaces/backoffice/CustomerReportInterface";
import CustomerReportService from "@services/backoffice/CustomerReportService";
import { transfromDateString } from "@utils/Helpers";

export default function CommentDetail() {
  const data = CustomerReportService.getter<CommentDetailReportInterface>("data");
  const message = CustomerReportService.getter<string>("message");
  let messageElement = <span>{" -"}</span>;

  if (message != "") {
    messageElement = (
      <>
        <br />
        <Message>{message}</Message>
      </>
    );
  }

  return (
    <Box>
      <Header>Comment Detail</Header>
      <Content>
        <Text>
          Id: <b>{data.id}</b>
        </Text>
        <Text>
          Email: <b>{data.commenter.email}</b>
        </Text>
        <Text>
          Name:&nbsp;
          <b>
            {data.commenter.first_name} {data.commenter.last_name}
          </b>
        </Text>
        <Text>
          Link to Chapter:&nbsp;
          <Link href={`/story/${data.chapter.story.slug}/${data.chapter.chapter_number}`} target="_blank">
            Link
          </Link>
        </Text>
        <Text>
          Comment: <br /> <Message>{data.message}</Message>
        </Text>
        <Text>Report Message: {messageElement}</Text>
        <Text>
          Created At: <b>{transfromDateString(data.created_at)}</b>
        </Text>
        <Text>
          Updated At: <b>{transfromDateString(data.updated_at)}</b>
        </Text>
      </Content>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  border-radius: 5px;
  width: 100%;
  color: #000000;
  background-color: #fff;

  margin-top: 20px;
`;

const Header = styled.div`
  box-sizing: border-box;
  width: 100%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  background-color: #505050;

  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const Content = styled.div`
  box-sizing: border-box;
  width: 100%;
  background-color: rgba(252, 252, 252, 1);

  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;

  /* display: grid;
  grid-template-columns: 1fr 1fr; */

  user-select: text;
`;

const Text = styled.div`
  font-size: 16px;
  color: #000;
  margin-top: 5px;
`;

const Message = styled.div`
  border-radius: 2px;
  font-size: 16px;
  font-weight: bold;
  margin-top: 5px;
  padding: 10px;
  color: #000;
  background-color: #bfc5cc;
`;

const Link = styled.a`
  font-size: 16px;
  font-weight: bold;
  color: #000;
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
`;
