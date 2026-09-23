import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import ScreenLayout from '../layout/ScreenLayout';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import StatCard from '../components/StatCard';
import CourseCard from '../components/CourseCard';
import BottomNavBar from '../components/BottomNavBar';
import { STUDENT_INFO, STATS_LIST, COURSES_LIST } from '../data/mockData';
import { Colors } from '../commons/constants/colors';
import { Spacing } from '../commons/constants/spacing';

export default function HomeScreen() {
  const [keyword, setKeyword] = useState('');
  const [currentTab, setCurrentTab] = useState('home');

  const filteredCourses = COURSES_LIST.filter((item) =>
    item.name.toLowerCase().includes(keyword.toLowerCase())
  );

  const handleSelectCourse = (course) => {
    Alert.alert('Môn học', `${course.name} - Tiến độ: ${course.progress}%`);
  };

  return (
    <ScreenLayout>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollArea}>
        <Header user={STUDENT_INFO} />

        <View style={styles.statsContainer}>
          {STATS_LIST.map((stat) => (
            <StatCard key={stat.id} item={stat} />
          ))}
        </View>

        <SearchBar value={keyword} onChangeText={setKeyword} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Môn học của tôi</Text>
          <Text style={styles.sectionBadge}>({filteredCourses.length})</Text>
        </View>

        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} onPress={handleSelectCourse} />
        ))}
      </ScrollView>

      <BottomNavBar activeTab={currentTab} onSelectTab={setCurrentTab} />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  scrollArea: {
    paddingBottom: Spacing.xl,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    marginVertical: Spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    marginTop: Spacing.md,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  sectionBadge: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 6,
    fontWeight: '600',
  },
});