import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../commons/constants/colors';
import { Radius, Spacing } from '../commons/constants/spacing';
import { checkCompleted } from '../commons/utils/helpers';
import { formatPercent } from '../commons/utils/formatters';

export default function CourseCard({ course, onPress }) {
  const isDone = checkCompleted(course.progress);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.card}
      onPress={() => onPress(course)}
    >
      <View style={styles.topRow}>
        <Image source={{ uri: course.icon }} style={styles.icon} />
        <View style={styles.info}>
          <Text style={styles.name}>{course.name}</Text>
          <Text style={styles.lessons}>{course.lessons}</Text>
        </View>

        {isDone ? (
          <View style={styles.badgeDone}>
            <Text style={styles.badgeDoneText}>✓ Đã hoàn thành</Text>
          </View>
        ) : (
          <Text style={styles.percentText}>{formatPercent(course.progress)}</Text>
        )}
      </View>

      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            {
              width: `${course.progress}%`,
              backgroundColor: isDone ? Colors.success : course.color,
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 38,
    height: 38,
    marginRight: Spacing.md,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  lessons: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  percentText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.textSecondary,
  },
  badgeDone: {
    backgroundColor: Colors.successLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.sm,
  },
  badgeDoneText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#047857',
  },
  track: {
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: 3,
    marginTop: Spacing.md,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
  },
});