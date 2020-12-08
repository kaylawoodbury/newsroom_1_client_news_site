import React from 'react'
import { connect } from 'react-redux'
import { Card, Grid, Image, Button } from 'semantic-ui-react'
import { fetchSingleArticle } from '../state/actions/articleActions'
import { bindActionCreators } from 'redux'
import { useTranslation } from 'react-i18next'
import imagePlaceholder from '../images/placeholder.png'

const DisplayArticles = props => {
  const { t } = useTranslation()
  const singleArticle = articleID => {
    props.fetchSingleArticle(articleID)
  }
  let articles
  let image
  if (props.categoryName) {
    articles = props.articles.filter(article => {
      return article.category === props.categoryName && article
    })
  } else {
    articles = props.articles
  }

  let articleDisplay = articles.map(article => {
    if (article.image) {
      image = article.image
    } else {
      image = imagePlaceholder
    }
    return (
      <Grid centered>
        <Grid.Column mobile={12} tablet={12} computer={8} largeScreen={8} widescreen={6}>
          <Card
            key={article.id}
            id={`article-${article.id}`}
            align='center'
            fluid
          >
            <Image src={image} wrapped ui={false} size='medium' />
            <Card.Content>
              <Card.Header>{article.title}</Card.Header>
              <Card.Description>
                <span className='date'>{article.lead}</span>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button
                id={`open-article-${article.id}`}
                onClick={() => singleArticle(article.id)}
                key={article.id}
              >
                {' '}
                {t('article.read-more')}
              </Button>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    )
  })

  return <div id='article-list'>{articleDisplay}</div>
}

const mapStateToProps = state => {
  return {
    articles: state.articles,
    categoryName: state.categoryName
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleArticle: bindActionCreators(fetchSingleArticle, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayArticles)
