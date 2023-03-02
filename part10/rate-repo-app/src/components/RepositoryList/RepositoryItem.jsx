import { View, Pressable, Image, StyleSheet } from 'react-native'
import { Typography } from '../styledComponents'
import theme from '../../theme'

import { useNavigate } from 'react-router-native'

const styles = StyleSheet.create({
  itemViewContainer: { padding: '5%', width: 375, gap: 15 },
  viewRowIntro: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 15,
  },
  viewRowCounts: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
  },
  imageAvatar: {
    height: 50,
    width: 50,
    borderRadius: 5,
  },
  viewInfo: {
    flexDirection: 'column',
    gap: 5,
    width: '80%',
    alignItems: 'flex-start',
  },
  description: {
    flexWrap: 'wrap',
  },
  language: {
    color: theme.colors.on.onPrimary.onDark,
    backgroundColor: theme.colors.primary.ui.background,
    borderRadius: 5,
    padding: 3,
    textAlign: 'center',
  },
  viewCount: {
    alignItems: 'center',
  },
})

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
    <View style={styles.itemViewContainer} testID="repositoryItem">
      <Pressable onPress={() => navigate(`/${props.id}`)}>
        <View style={styles.viewRowIntro}>
          <Image source={ownerAvatarUrl} style={styles.imageAvatar} />
          <View style={styles.viewInfo}>
            <Typography variant="subtitle2">{fullName}</Typography>
            <Typography variant="caption" sx={styles.description}>
              {description}
            </Typography>
            <Typography variant="body2" sx={styles.language}>
              {language}
            </Typography>
          </View>
        </View>
        <View style={styles.viewRowCounts}>
          <View style={styles.viewCount}>
            <Typography variant="body2">
              {formatCount(stargazersCount)}
            </Typography>
            <Typography variant="body2">Stars</Typography>
          </View>
          <View style={styles.viewCount}>
            <Typography variant="body2">{formatCount(forksCount)}</Typography>
            <Typography variant="body2">Forks</Typography>
          </View>
          <View style={styles.viewCount}>
            <Typography variant="body2">{formatCount(reviewCount)}</Typography>
            <Typography variant="body2">Reviews</Typography>
          </View>
          <View style={styles.viewCount}>
            <Typography variant="body2">
              {formatCount(ratingAverage)}
            </Typography>
            <Typography variant="body2">Rating</Typography>
          </View>
        </View>
        {children}
      </Pressable>
    </View>
  )
}

export default RepositoryItem
