import React, { useState, useEffect, ReactElement } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import tw from 'twin.macro';
import styled from 'styled-components';
import { SectionHeading } from 'components/misc/Headings';
import { PrimaryButton as PrimaryButtonBase } from 'components/misc/Buttons';
import { ReactComponent as ChevronLeftIcon } from 'feather-icons/dist/icons/chevron-left.svg';
import { ReactComponent as ChevronRightIcon } from 'feather-icons/dist/icons/chevron-right.svg';

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-16 lg:py-20`;

const HeadingWithControl = tw.div`flex flex-col items-center sm:items-stretch sm:flex-row justify-between`;
const Heading = tw(SectionHeading)``;
const Controls = tw.div`flex items-center`;
const ControlButton = styled(PrimaryButtonBase)`
  ${tw`mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2`}
  svg {
    ${tw`w-6 h-6`}
  }
`;
const PrevButton = tw(ControlButton)``;
const NextButton = tw(ControlButton)``;

const CardSlider = styled(Slider)`
  ${tw`mt-16`}
  .slick-track {
    ${tw`flex`}
  }
  .slick-slide {
    ${tw`h-auto flex justify-center mb-1`}
  }
`;
const Card = tw.div`h-full flex! flex-col sm:border max-w-sm sm:rounded-tl-4xl sm:rounded-br-5xl relative focus:outline-none`;
const CardImage = styled.div((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`w-full h-56 sm:h-64 bg-cover bg-center rounded sm:rounded-none sm:rounded-tl-4xl`,
]);
const TextInfo = tw.div`py-6 sm:px-10 sm:py-6`;
const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center`;
const Title = tw.h5`text-2xl font-bold`;
const Description = tw.p`text-sm leading-loose mt-2 sm:mt-4`;

type slideRefType = {
  slickPrev?: () => void;
  slickNext?: () => void;
};

type cardType = {
  img: string;
  title: string;
  detail: string;
  link?: string;
};

const PrimaryButton = tw.a`px-8 py-3 font-bold rounded bg-primary-500 text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300 mt-auto sm:text-lg rounded-none w-full rounded sm:rounded-none sm:rounded-br-4xl py-3 sm:py-6`;
export default (): ReactElement => {
  // useState is used instead of useRef below because we want to re-render when sliderRef becomes available (not null)
  const mockCards = [
    {
      img: 'https://admissions.kku.ac.th/wp-content/uploads/2019/09/11111111111111111.jpg',
      title: 'กิจกรรม',
      detail: 'ยังไม่มีกิจกรรม เร็ว ๆ นี้ โดยมหาวิทยาลัยขอนแก่น',
    },
    {
      img: 'https://admissions.kku.ac.th/wp-content/uploads/2019/09/11111111111111111.jpg',
      title: 'กิจกรรม',
      detail: 'ยังไม่มีกิจกรรม เร็ว ๆ นี้ โดยมหาวิทยาลัยขอนแก่น',
    },
    {
      img: 'https://admissions.kku.ac.th/wp-content/uploads/2019/09/11111111111111111.jpg',
      title: 'กิจกรรม',
      detail: 'ยังไม่มีกิจกรรม เร็ว ๆ นี้ โดยมหาวิทยาลัยขอนแก่น',
    },
    {
      img: 'https://admissions.kku.ac.th/wp-content/uploads/2019/09/11111111111111111.jpg',
      title: 'กิจกรรม',
      detail: 'ยังไม่มีกิจกรรม เร็ว ๆ นี้ โดยมหาวิทยาลัยขอนแก่น',
    },
  ];

  const [sliderRef, setSliderRef] = useState<slideRefType | null>(null);
  const [cards, setCards] = useState<cardType[]>([]);
  const sliderSettings = {
    arrows: false,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
        },
      },

      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/events/findEventByType/event`
      )
      .then(({ data }) => {
        if (data.data.length > 0) {
          setCards(data.data);
        } else {
          setCards(mockCards);
        }
      });
  }, []);

  return (
    <Container id="event">
      <Content>
        <HeadingWithControl>
          <Heading>กิจกรรม</Heading>
          <Controls>
            <PrevButton onClick={sliderRef?.slickPrev}>
              <ChevronLeftIcon />
            </PrevButton>
            <NextButton onClick={sliderRef?.slickNext}>
              <ChevronRightIcon />
            </NextButton>
          </Controls>
        </HeadingWithControl>
        <CardSlider
          ref={setSliderRef}
          {...sliderSettings}
          style={{ minWidth: '1000px' }}
        >
          {cards.map((card, index) => (
            <Card key={index}>
              <CardImage imageSrc={card.img} />
              <TextInfo>
                <TitleReviewContainer>
                  <Title>{card.title}</Title>
                </TitleReviewContainer>
                <Description>{card.detail}</Description>
              </TextInfo>
              <PrimaryButton href={card.link} target="#blank">
                ดูรายละเอียด
              </PrimaryButton>
            </Card>
          ))}
        </CardSlider>
      </Content>
    </Container>
  );
};
