import { View, Pressable, Image, StyleSheet } from 'react-native'
import { Typography } from '../../../components/Typography.styles'
import theme from '../../../theme'

import { useNavigate } from 'react-router-native'

// Good enough, edge case:
// console.log(displayItemInfo(21015))
export const formatCount = (number) => {
  if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}K`
  }
  return JSON.stringify(number)
}

const RepositoryItem = ({
  item: {
    fullName,
    description,
    language,
    stargazersCount,
    forksCount,
    reviewCount,
    ratingAverage,
    ownerAvatarUrl,
    ...props
  },
  children
}) => {
  const navigate = useNavigate()

  return (
    <View style={styles.container} testID="repositoryItem">
      <Pressable onPress={() => navigate(`/${props.id}`)}>
        <View style={styles.viewRowIntro}>
          <View style={styles.imageView}>
          <Image source={ownerAvatarUrl} style={styles.imageAvatar} />
          </View>
          <View style={styles.viewInfo}>
            <Typography variant="subtitle2">{fullName}</Typography>
            <Typography variant="caption" sx={styles.description}>
              {description}
            </Typography>
            <Typography variant="subtitle2" sx={styles.language}>
              {language}
            </Typography>
          </View>
        </View>
        <View style={styles.viewRowCounts}>
          <View style={styles.viewCount}>
            <Typography variant="subtitle2">
              {formatCount(stargazersCount)}
            </Typography>
            <Typography variant="caption">Stars</Typography>
          </View>
          <View style={styles.viewCount}>
            <Typography variant="subtitle2">{formatCount(forksCount)}</Typography>
            <Typography variant="caption">Forks</Typography>
          </View>
          <View style={styles.viewCount}>
            <Typography variant="subtitle2">{formatCount(reviewCount)}</Typography>
            <Typography variant="caption">Reviews</Typography>
          </View>
          <View style={styles.viewCount}>
            <Typography variant="subtitle2">
              {formatCount(ratingAverage)}
            </Typography>
            <Typography variant="caption">Rating</Typography>
          </View>
        </View>
        {children}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
     padding: '5%', 
    //  width: 375, 
    //  gap: 15 
    },
  viewRowIntro: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  viewRowCounts: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
  },
  imageAvatar: {
    height: 60,
    width: 60,
    borderRadius: 5,
  },
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%'
  },
  viewInfo: {
    flexDirection: 'column',
    gap: 5,
    width: '75%',
    alignItems: 'flex-start',
  },
  description: {
    flexWrap: 'wrap',
  },
  language: {
    color: theme.colors.on.onPrimary.onDark,
    backgroundColor: theme.colors.ui.surface,
    borderRadius: 5,
    padding: 3,
    textAlign: 'center',
  },
  viewCount: {
    alignItems: 'center',
    marginTop: '5%'
  },
})

export default RepositoryItem
