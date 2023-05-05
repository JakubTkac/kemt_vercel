import { fetcher } from "../../lib/api";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { COLOR, FONT_SIZE, FONT_WEIGHT, SCREENS } from "../../Theme";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";
import StyledHeadingH1 from "../Styled/StyledHeadingH1";

const URL = process.env.STRAPI_URL;

const StyledContainer = styled.div`
  background-color: ${COLOR.WHITE};
  border: 1px solid ${COLOR.PLATINUM[600]};
  margin-bottom: 2rem;
  padding: 0.5rem;
`;

const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 0.5rem;
  @media (max-width: ${SCREENS.SM}) {
    flex-direction: column;
  }
  span {
    min-width: 15rem;
    font-weight: ${FONT_WEIGHT.BOLD};
    @media (max-width: ${SCREENS.SM}) {
      min-width: auto;
    }
  }
  p {
  }
  a {
    color: ${COLOR.SEC[400]};
    text-decoration: underline;
  }
`;

const StyledTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  h2 {
    font-size: ${FONT_SIZE.L};
    color: ${COLOR.SEC[500]};
    font-weight: ${FONT_WEIGHT.EXTRABOLD};
  }
  svg {
    font-size: ${FONT_SIZE.XL};
    color: ${COLOR.SEC[500]};
  }
  margin-bottom: 1rem;
`;

const Publication = ({ publication }) => {
  const id = publication.id;
  const [publicationItems, setPublicationItems] = useState({});

  useEffect(() => {
    const fetchPublication = async () => {
      const tempPublicationItems = await fetcher(
        `${URL}/publications/${id}?populate=*`
      );
      setPublicationItems(tempPublicationItems);
    };
    fetchPublication();
  }, [id]);

  console.log("publication", publicationItems);

  const { anotation, doi, isbn, title, year, authors, publisher } =
    publicationItems?.data?.attributes || {};

  console.log(
    authors?.data.map((author) => {
      console.log(author.attributes.name);
    })
  );

  return (
    <>
      <StyledHeadingH1>Publikacie</StyledHeadingH1>
      <StyledContainer>
        <StyledTitle>
          <h2>{title}</h2>
          <FiChevronDown></FiChevronDown>
        </StyledTitle>
        <StyledContentContainer>
          <span>Autori: </span>
          <div>
            {authors?.data.map((author) => {
              return (
                <Link
                  key={author.id}
                  href={`/organizacia/${author.attributes.slug}`}
                >
                  <a>
                    <p>{author.attributes.name}</p>
                  </a>
                </Link>
              );
            })}
          </div>
        </StyledContentContainer>
        <StyledContentContainer>
          <span>Rok: </span>
          <p>{year}</p>
        </StyledContentContainer>
        <StyledContentContainer>
          <span>Vydavatel: </span>
          <p>{publisher}</p>
        </StyledContentContainer>
        {anotation && (
          <StyledContentContainer>
            <span>Anotacia: </span>
            <p>{anotation}</p>
          </StyledContentContainer>
        )}
        {isbn && (
          <StyledContentContainer>
            <span>ISBN: </span>
            <p>{isbn}</p>
          </StyledContentContainer>
        )}
        {doi && (
          <StyledContentContainer>
            <span>DOI: </span>
            <p>{doi}</p>
          </StyledContentContainer>
        )}
      </StyledContainer>
    </>
  );
};

export default Publication;
